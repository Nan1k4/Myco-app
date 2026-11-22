import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

export type IconName =
  | 'alert'
  | 'arrow-forward'
  | 'bookmark'
  | 'book'
  | 'calendar'
  | 'check'
  | 'check-circle'
  | 'chevron-back'
  | 'chevron-down'
  | 'chevron-forward'
  | 'chevron-up'
  | 'close'
  | 'cut'
  | 'droplet'
  | 'eye'
  | 'flame'
  | 'hand'
  | 'help'
  | 'info'
  | 'locate'
  | 'map'
  | 'pin'
  | 'plus'
  | 'rain'
  | 'refresh'
  | 'search'
  | 'shield'
  | 'sliders'
  | 'snow'
  | 'thermometer'
  | 'time'
  | 'trash'
  | 'warning';

interface IconProps {
  readonly name: IconName;
  readonly size?: number;
  readonly color?: string;
  readonly strokeWidth?: number;
}

export function Icon({ name, size = 20, color = '#141B16', strokeWidth = 1.75 }: IconProps) {
  const common = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  } as const;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      {renderGlyph(name, common)}
    </Svg>
  );
}

function renderGlyph(
  name: IconName,
  p: { stroke: string; strokeWidth: number; strokeLinecap: 'round'; strokeLinejoin: 'round'; fill: 'none' },
) {
  switch (name) {
    case 'alert':
      return (
        <>
          <Circle cx="12" cy="12" r="9.5" {...p} />
          <Line x1="12" y1="8" x2="12" y2="12.5" {...p} />
          <Circle cx="12" cy="16" r="0.6" fill={p.stroke} />
        </>
      );
    case 'arrow-forward':
      return (
        <>
          <Line x1="5" y1="12" x2="19" y2="12" {...p} />
          <Polyline points="13 6 19 12 13 18" {...p} />
        </>
      );
    case 'bookmark':
      return <Path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z" {...p} />;
    case 'book':
      return (
        <>
          <Path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" {...p} />
          <Line x1="8" y1="7" x2="16" y2="7" {...p} />
        </>
      );
    case 'calendar':
      return (
        <>
          <Rect x="3" y="5" width="18" height="16" rx="2" {...p} />
          <Line x1="16" y1="3" x2="16" y2="7" {...p} />
          <Line x1="8" y1="3" x2="8" y2="7" {...p} />
          <Line x1="3" y1="10" x2="21" y2="10" {...p} />
        </>
      );
    case 'check':
      return <Polyline points="5 12.5 10 17.5 19 7" {...p} />;
    case 'check-circle':
      return (
        <>
          <Circle cx="12" cy="12" r="9.5" {...p} />
          <Polyline points="8.5 12.5 11 15 16 9.5" {...p} />
        </>
      );
    case 'chevron-back':
      return <Polyline points="15 6 9 12 15 18" {...p} />;
    case 'chevron-down':
      return <Polyline points="6 9 12 15 18 9" {...p} />;
    case 'chevron-forward':
      return <Polyline points="9 6 15 12 9 18" {...p} />;
    case 'chevron-up':
      return <Polyline points="6 15 12 9 18 15" {...p} />;
    case 'close':
      return (
        <>
          <Line x1="6" y1="6" x2="18" y2="18" {...p} />
          <Line x1="18" y1="6" x2="6" y2="18" {...p} />
        </>
      );
    case 'cut':
      return (
        <>
          <Circle cx="6.5" cy="6.5" r="2.5" {...p} />
          <Circle cx="6.5" cy="17.5" r="2.5" {...p} />
          <Line x1="8.5" y1="8.5" x2="19" y2="19" {...p} />
          <Line x1="8.5" y1="15.5" x2="19" y2="5" {...p} />
        </>
      );
    case 'droplet':
      return <Path d="M12 3.5C12 3.5 6 10.2 6 14.5a6 6 0 0 0 12 0C18 10.2 12 3.5 12 3.5z" {...p} />;
    case 'eye':
      return (
        <>
          <Path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" {...p} />
          <Circle cx="12" cy="12" r="2.5" {...p} />
        </>
      );
    case 'flame':
      return <Path d="M12 3c2.5 3 5 5.6 5 9.5a5 5 0 0 1-10 0c0-2.5 1.5-4.8 3-6.5 0 2 1 3 2 3 0-2 0-4 0-6z" {...p} />;
    case 'hand':
      return <Path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-12 0v-3.5a1.5 1.5 0 0 1 3 0" {...p} />;
    case 'help':
      return (
        <>
          <Circle cx="12" cy="12" r="9.5" {...p} />
          <Path d="M9.5 9.5a2.5 2.5 0 0 1 4.8.8c0 1.7-2.3 2.2-2.3 3.7" {...p} />
          <Circle cx="12" cy="17" r="0.6" fill={p.stroke} />
        </>
      );
    case 'info':
      return (
        <>
          <Circle cx="12" cy="12" r="9.5" {...p} />
          <Line x1="12" y1="11" x2="12" y2="16" {...p} />
          <Circle cx="12" cy="8" r="0.6" fill={p.stroke} />
        </>
      );
    case 'locate':
      return (
        <>
          <Circle cx="12" cy="12" r="5" {...p} />
          <Line x1="12" y1="2.5" x2="12" y2="5.5" {...p} />
          <Line x1="12" y1="18.5" x2="12" y2="21.5" {...p} />
          <Line x1="2.5" y1="12" x2="5.5" y2="12" {...p} />
          <Line x1="18.5" y1="12" x2="21.5" y2="12" {...p} />
        </>
      );
    case 'map':
      return <Path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z" {...p} />;
    case 'pin':
      return (
        <>
          <Path d="M12 21s6.5-5.7 6.5-11a6.5 6.5 0 1 0-13 0c0 5.3 6.5 11 6.5 11z" {...p} />
          <Circle cx="12" cy="10" r="2.2" {...p} />
        </>
      );
    case 'plus':
      return (
        <>
          <Line x1="12" y1="5" x2="12" y2="19" {...p} />
          <Line x1="5" y1="12" x2="19" y2="12" {...p} />
        </>
      );
    case 'rain':
      return (
        <>
          <Path d="M6.5 14.5h11a3.5 3.5 0 0 0 .5-6.95A5.5 5.5 0 0 0 7.2 6.5a4 4 0 0 0-.7 8z" {...p} />
          <Line x1="8.5" y1="18" x2="7.5" y2="20.5" {...p} />
          <Line x1="12.5" y1="18" x2="11.5" y2="20.5" {...p} />
          <Line x1="16.5" y1="18" x2="15.5" y2="20.5" {...p} />
        </>
      );
    case 'refresh':
      return (
        <>
          <Path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" {...p} />
          <Polyline points="19.5 4 19.5 8.5 15 8.5" {...p} />
        </>
      );
    case 'search':
      return (
        <>
          <Circle cx="11" cy="11" r="6.5" {...p} />
          <Line x1="16" y1="16" x2="20.5" y2="20.5" {...p} />
        </>
      );
    case 'shield':
      return <Path d="M12 3l7 3v5.5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6z" {...p} />;
    case 'sliders':
      return (
        <>
          <Line x1="4" y1="7" x2="20" y2="7" {...p} />
          <Circle cx="9" cy="7" r="2" fill={p.stroke} />
          <Line x1="4" y1="12" x2="20" y2="12" {...p} />
          <Circle cx="15" cy="12" r="2" fill={p.stroke} />
          <Line x1="4" y1="17" x2="20" y2="17" {...p} />
          <Circle cx="10" cy="17" r="2" fill={p.stroke} />
        </>
      );
    case 'snow':
      return (
        <>
          <Line x1="12" y1="3" x2="12" y2="21" {...p} />
          <Line x1="4.2" y1="7.5" x2="19.8" y2="16.5" {...p} />
          <Line x1="19.8" y1="7.5" x2="4.2" y2="16.5" {...p} />
        </>
      );
    case 'thermometer':
      return (
        <>
          <Path d="M14 14.5V5.5a2 2 0 0 0-4 0v9a3.5 3.5 0 1 0 4 0z" {...p} />
          <Circle cx="12" cy="17.5" r="1.2" fill={p.stroke} />
        </>
      );
    case 'time':
      return (
        <>
          <Circle cx="12" cy="12" r="9" {...p} />
          <Polyline points="12 7 12 12 15.5 14" {...p} />
        </>
      );
    case 'trash':
      return (
        <>
          <Line x1="4" y1="6" x2="20" y2="6" {...p} />
          <Path d="M9 6V4h6v2" {...p} />
          <Path d="M6.5 6l1 14a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l1-14" {...p} />
        </>
      );
    case 'warning':
      return (
        <>
          <Path d="M12 3.5L21 19.5H3z" {...p} />
          <Line x1="12" y1="10" x2="12" y2="14" {...p} />
          <Circle cx="12" cy="17" r="0.6" fill={p.stroke} />
        </>
      );
  }
}