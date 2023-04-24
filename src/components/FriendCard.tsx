import { Card, Grid, Text } from '@geist-ui/core';
import Image from 'next/image';
import Link from 'next/link';

import { FriendInfo, friends } from '@/data/friends';

interface FriendCardProps extends FriendInfo {}

const FriendCard = ({ name, description, avatar, url }: FriendCardProps) => {
    const hasAvatar = avatar !== undefined && avatar !== '';
    const hasUrl = url !== undefined && url !== '';
    const urlToUse = hasUrl ? url : '#';
    const avatarSrc = hasAvatar ? avatar : '/elon.jpg';
    return (
        <>
            <style jsx global>{`
                .rounded-full {
                    border-radius: 9999px;
                }
            `}</style>

            <Card hoverable width={'100%'} className={'not-prose'} title={description}>
                <Card.Content>
                    <Link href={urlToUse} target={'_blank'}>
                        <Grid.Container gap={2}>
                            <Grid xs={6}>
                                <Image
                                    src={avatarSrc}
                                    alt={'avatar'}
                                    height={100}
                                    width={100}
                                    className={'rounded-full'}
                                />
                            </Grid>
                            <Grid xs={18} direction={'column'}>
                                <div>
                                    <Text
                                        h3
                                        className={'text-lg font-medium text-gray-900 truncate'}
                                    >
                                        {name}
                                    </Text>
                                    <Text
                                        type={'secondary'}
                                        className={
                                            'mt-1 text-sm text-gray-600 text-ellipsis truncate'
                                        }
                                    >
                                        {description}
                                    </Text>
                                </div>
                            </Grid>
                        </Grid.Container>
                    </Link>
                </Card.Content>
            </Card>
        </>
    );
};

const FriendCards = () => {
    return (
        <div className={'not-prose'}>
            <Grid.Container gap={2} justify={'flex-start'}>
                {friends.map((friend: FriendInfo, i) => (
                    <Grid xs={24} md={12} key={i}>
                        <FriendCard
                            name={friend.name}
                            description={friend.description}
                            url={friend.url}
                            avatar={friend.avatar}
                        />
                    </Grid>
                ))}
            </Grid.Container>
        </div>
    );
};

export { FriendCards, FriendCard };
