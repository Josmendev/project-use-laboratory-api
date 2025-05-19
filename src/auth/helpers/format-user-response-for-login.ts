import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';

export const formatUserResponseForLogin = (user: Subscriber) => ({
  userId: user.subscriberId,
  username: user.username,
});
