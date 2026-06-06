import type { CSSProperties } from 'react'
import type { Lang } from '../../config/storySequence'
import { getTimelineMarkerContent, TIMELINE_MARKERS } from '../../features/addressTimeline/timelineConfig'

type TimelineGifMarkersProps = {
  lang: Lang
  progress: number
}

export default function TimelineGifMarkers({ lang, progress }: TimelineGifMarkersProps) {
  const markerContent = getTimelineMarkerContent(lang)

  return (
    <div className="timeline-markers-layer" data-testid="timeline-markers-layer">
      {TIMELINE_MARKERS.map((marker) => {
        const visible = progress >= marker.threshold
        const content = markerContent.find((entry) => entry.markerId === marker.id)

        return (
          <div
            key={marker.id}
            className="timeline-marker-group"
            data-testid={`timeline-marker-group-${marker.id}`}
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
            }}
          >
            <div
              className="timeline-gif-marker"
              data-testid={`timeline-marker-${marker.id}`}
              data-visible={visible ? 'true' : 'false'}
              style={{
                opacity: visible ? 1 : 0,
                transform: `translate(-50%, -50%) rotate(${marker.rotation}deg) scale(${marker.scale})`,
              }}
            >
              <img src="/images/TimeLine/Gabacho2.gif" alt="" aria-hidden="true" />
            </div>

            {content ? (
              <div
                className="timeline-marker-content"
                data-testid={`timeline-marker-content-${marker.id}`}
                data-position={content.position}
                data-visible={visible ? 'true' : 'false'}
                style={
                  {
                    opacity: visible ? 1 : 0,
                    '--marker-offset-x': `${content.xOffset}px`,
                    '--marker-offset-y': `${content.yOffset}px`,
                  } as CSSProperties
                }
              >
                <img
                  className="timeline-marker-content-image"
                  src={content.image}
                  alt=""
                  aria-hidden="true"
                />
                <span className="timeline-marker-content-text">{content.text}</span>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
