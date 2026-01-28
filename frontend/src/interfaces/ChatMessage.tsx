export default interface ChatMessage {
  id?: number;        
  conversationId: number;
  userId: number;
  content: string;       
  createdAt?: string;
}
