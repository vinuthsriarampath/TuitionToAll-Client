import {ConversationType} from '@features/messaging/enums/conversation-type';

export class ConversationResponse {
  id!: number;
  topic!: string;
  type!: ConversationType;
  lastMessageAt!: string;
  otherParticipantName!: string;
  otherParticipantSlug!: string;
  otherParticipantDp!: string;
  unreadCount!:number;
}
