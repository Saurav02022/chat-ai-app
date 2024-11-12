type MessageProps = {
  role: "system" | "user" | "assistant" | "function" | "data" | "tool";
  content: string;
};

const Message: React.FC<MessageProps> = ({ role, content }) => (
  <div
    className={`p-4 rounded-lg max-w-xs shadow-md transition-all duration-200 ${
      role === "user"
        ? "bg-blue-500 text-white self-end rounded-br-xl"
        : "bg-gray-100 text-gray-900 self-start rounded-bl-xl border border-gray-300"
    }`}
  >
    <strong className="block font-semibold">
      {role === "user" ? "You" : "AI"}:
    </strong>
    <p className="mt-2 whitespace-pre-wrap">{content}</p>
  </div>
);

export default Message;
