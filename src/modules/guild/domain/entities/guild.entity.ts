export interface GuildProps {
    id: string;
    name: string;
    joinedAt: Date;
    notificationChannelId: string | null;
    isActive: boolean;
}

export class Guild {
    private constructor(private readonly props: GuildProps) {
        this.validate();
    }

    private validate(): void {
        if (!this.props.id.trim()) {
            throw new Error('Guild ID cannot be empty');
        }

        if (!this.props.name.trim()) {
            throw new Error('Guild name cannot be empty');
        }
    }

    deactivate(): Guild {
        return new Guild({
            ...this.props,
            isActive: false,
        });
    }

    updateChannel(channelId: string): Guild {
        return new Guild({
            ...this.props,
            id: channelId.trim(),
        });
    }
}
