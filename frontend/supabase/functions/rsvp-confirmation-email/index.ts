const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type RsvpPayload = {
  id: string
  full_name: string
  is_attending: boolean
  has_plus_one: boolean
  plus_one_name: string | null
  created_at: string
}

function buildEmailBody(payload: RsvpPayload) {
  return `New RSVP received:

Name: ${payload.full_name}
Attending: ${payload.is_attending ? 'Yes' : 'No'}
Plus one: ${payload.has_plus_one ? 'Yes' : 'No'}
Plus one name: ${payload.plus_one_name ?? 'N/A'}
Submitted at: ${payload.created_at}`
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const payload = (await request.json()) as Partial<RsvpPayload>
    if (
      !payload.full_name ||
      typeof payload.is_attending !== 'boolean' ||
      typeof payload.has_plus_one !== 'boolean' ||
      !payload.created_at
    ) {
      return new Response(JSON.stringify({ error: 'Invalid RSVP payload.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const toEmail = Deno.env.get('RSVP_NOTIFICATION_EMAIL') ?? 'ramwill1991@gmail.com'
    const fromEmail = Deno.env.get('RSVP_FROM_EMAIL')

    if (!resendApiKey || !fromEmail) {
      return new Response(JSON.stringify({ error: 'Missing email provider configuration.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: 'New RSVP Confirmation - Luna & Jake Wedding',
        text: buildEmailBody(payload as RsvpPayload),
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      return new Response(JSON.stringify({ error: 'Email delivery failed.', details: errorText }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.'

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
