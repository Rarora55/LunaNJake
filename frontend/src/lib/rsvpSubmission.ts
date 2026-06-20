export type AttendanceAnswer = 'yes' | 'no' | ''
export type PlusOneAnswer = 'yes' | 'no' | ''

export type RsvpFormValues = {
  fullName: string
  isAttending: AttendanceAnswer
  plusOne: PlusOneAnswer
  plusOneName: string
}

export type RsvpValidationErrors = Partial<Record<'fullName' | 'isAttending' | 'plusOne' | 'plusOneName', string>>

export type RsvpInsertRecord = {
  id: string
  full_name: string
  is_attending: boolean
  has_plus_one: boolean
  plus_one_name: string | null
  created_at: string
}

const RSVP_TABLE = 'rsvp_confirmations'
const RSVP_FUNCTION = 'rsvp-confirmation-email'

function getSupabaseConfig() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const rsvpEmailNotificationsEnabled = import.meta.env.VITE_RSVP_EMAIL_NOTIFICATIONS_ENABLED === 'true'

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase RSVP configuration.')
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    rsvpEmailNotificationsEnabled,
  }
}

export function validateRsvpForm(values: RsvpFormValues): RsvpValidationErrors {
  const errors: RsvpValidationErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full Name is required.'
  }

  if (!values.isAttending) {
    errors.isAttending = 'Please tell us if you are attending.'
  }

  if (!values.plusOne) {
    errors.plusOne = 'Please tell us if you are bringing a plus one.'
  }

  if (values.plusOne === 'yes' && !values.plusOneName.trim()) {
    errors.plusOneName = 'Plus one name is required when bringing a plus one.'
  }

  return errors
}

export function hasValidationErrors(errors: RsvpValidationErrors): boolean {
  return Object.keys(errors).length > 0
}

async function insertRsvp(values: RsvpFormValues): Promise<RsvpInsertRecord> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  const record: RsvpInsertRecord = {
    id: crypto.randomUUID(),
    full_name: values.fullName.trim(),
    is_attending: values.isAttending === 'yes',
    has_plus_one: values.plusOne === 'yes',
    plus_one_name: values.plusOne === 'yes' ? values.plusOneName.trim() : null,
    created_at: new Date().toISOString(),
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${RSVP_TABLE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(record),
  })

  if (!response.ok) {
    throw new Error(`Failed to save RSVP (${response.status}).`)
  }

  return record
}

async function sendNotification(record: RsvpInsertRecord): Promise<void> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  const response = await fetch(`${supabaseUrl}/functions/v1/${RSVP_FUNCTION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify(record),
  })

  if (!response.ok) {
    throw new Error(`Failed to send RSVP email (${response.status}).`)
  }
}

export async function submitRsvp(values: RsvpFormValues): Promise<RsvpInsertRecord> {
  const { rsvpEmailNotificationsEnabled } = getSupabaseConfig()
  const record = await insertRsvp(values)

  if (rsvpEmailNotificationsEnabled) {
    await sendNotification(record)
  }

  return record
}
