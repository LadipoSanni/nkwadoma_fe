// components/InitialsAvatar.tsx
import React from 'react';

interface InitialsAvatarProps {
    initials: string;
    size?: number;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ initials, size = 30 }) => {
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2,
        color: '#fff',
    };

    return (
        <div style={avatarStyle}>
            {initials}
        </div>
    );
};

export default InitialsAvatar;
