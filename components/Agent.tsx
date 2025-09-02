import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
  const callStatus: CallStatus = CallStatus.INACTIVE;
  const isSpeaking = true;

  const messages = [
    "What is yor name?",
    "My name is john doe",
    "What is your age?",
    "I am 25 years old",
    "What is your profession?",
    "I am a software engineer",
    "What are your hobbies?",
    "I love to read books and play football",
    "What is your favorite programming language?",
    "I love JavaScript and Python",
    "Tell me about yourself?",
    "I am a software engineer with 5 years of experience in web development.",
    "I have worked on various projects using React, Node.js, and Python.",
    "In my free time, I enjoy reading tech blogs and exploring new technologies.",
  ];

  const lastMessage = messages[messages.length - 1];
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />

            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user-avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
              key={lastMessage}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75 ",
                (callStatus === CallStatus.CONNECTING) & "hidden"
              )}
            />
            <span>
              {callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.FINISHED
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </>
  );
};

export default Agent;
