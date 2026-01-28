import { clsx } from 'clsx';

export type AvatarGroupSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarGroupItem {
  src?: string;
  name: string;
  alt?: string;
}

export interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  size?: AvatarGroupSize;
  max?: number;
  className?: string;
}

const sizeMap: Record<AvatarGroupSize, string> = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const fontSizeMap: Record<AvatarGroupSize, string> = {
  xs: '0.5rem',
  sm: '0.625rem',
  md: '0.75rem',
  lg: '0.875rem',
};

const overlapMap: Record<AvatarGroupSize, string> = {
  xs: '-8px',
  sm: '-10px',
  md: '-12px',
  lg: '-14px',
};

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function AvatarGroup({
  avatars,
  size = 'md',
  max = 4,
  className,
}: AvatarGroupProps) {
  const sizeValue = sizeMap[size];
  const fontSize = fontSizeMap[size];
  const overlap = overlapMap[size];

  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <>
      <div
        className={clsx('td-avatar-group', className)}
        style={{
          '--avatar-size': sizeValue,
          '--avatar-font-size': fontSize,
          '--avatar-overlap': overlap,
        } as React.CSSProperties}
      >
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            className="td-avatar-group__item"
            style={{ zIndex: visibleAvatars.length - index }}
            title={avatar.name}
          >
            {avatar.src ? (
              <img
                src={avatar.src}
                alt={avatar.alt || avatar.name}
                className="td-avatar-group__image"
              />
            ) : (
              <span className="td-avatar-group__initials">
                {getInitials(avatar.name)}
              </span>
            )}
          </div>
        ))}
        {remaining > 0 && (
          <div
            className="td-avatar-group__item td-avatar-group__overflow"
            style={{ zIndex: 0 }}
          >
            <span className="td-avatar-group__initials">+{remaining}</span>
          </div>
        )}
      </div>
      <AvatarGroupStyles />
    </>
  );
}

function AvatarGroupStyles() {
  return (
    <style>{`
      .td-avatar-group {
        display: flex;
        align-items: center;
      }

      .td-avatar-group__item {
        position: relative;
        width: var(--avatar-size);
        height: var(--avatar-size);
        border-radius: 9999px;
        overflow: hidden;
        background: linear-gradient(135deg, #2B3447 0%, #1C2438 100%);
        border: 2px solid #1C2438;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: transform 0.15s ease;
      }

      .td-avatar-group__item:not(:first-child) {
        margin-left: var(--avatar-overlap);
      }

      .td-avatar-group__item:hover {
        transform: translateY(-2px);
      }

      .td-avatar-group__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .td-avatar-group__initials {
        font-size: var(--avatar-font-size);
        font-weight: 600;
        color: white;
        text-transform: uppercase;
        user-select: none;
      }

      .td-avatar-group__overflow {
        background: linear-gradient(135deg, #E85A4F 0%, #C44D44 100%);
      }
    `}</style>
  );
}
