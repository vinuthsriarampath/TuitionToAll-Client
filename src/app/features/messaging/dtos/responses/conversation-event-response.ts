import { ConversationEventType } from "@features/messaging/enums/conversation-event-type";

export class ConversationEventResponse {
    type!: ConversationEventType;
    conversationId!: number;
    messageId?: number;
}
