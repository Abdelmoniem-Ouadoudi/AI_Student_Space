"use client";

import type React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useChat } from "@/hooks/useChat";
import AuthGuard from "@/components/auth/AuthGuard";
import ReactMarkdown from "react-markdown";

// Lazy load heavy components
const ScrollArea = dynamic(
  () =>
    import("@/components/ui/scroll-area").then((mod) => ({
      default: mod.ScrollArea,
    })),
  {
    loading: () => <div className="h-full overflow-auto" />,
  }
);

const FileInputArea = dynamic(
  () =>
    import("@/components/ui/file-input-area").then((mod) => ({
      default: mod.FileInputArea,
    })),
  {
    loading: () => (
      <div className="h-16 bg-slate-800/50 rounded-lg animate-pulse" />
    ),
  }
);

const AnimatedSection = dynamic(
  () =>
    import("@/components/PageTransition").then((mod) => ({
      default: mod.AnimatedSection,
    })),
  {
    loading: () => (
      <div className="animate-pulse bg-slate-800/20 rounded-lg h-20" />
    ),
  }
);

// Removed HoverCard and AnimatedButton components used by quick prompts

// Lazy load icons - removed unused icons for quick prompts
const User = dynamic(() =>
  import("lucide-react").then((mod) => ({ default: mod.User }))
);
const FileText = dynamic(() =>
  import("lucide-react").then((mod) => ({ default: mod.FileText }))
);

// Lazy load UI components
const Avatar = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => ({ default: mod.Avatar }))
);
const AvatarFallback = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => ({
    default: mod.AvatarFallback,
  }))
);
const Card = dynamic(() =>
  import("@/components/ui/card").then((mod) => ({ default: mod.Card }))
);
const CardContent = dynamic(() =>
  import("@/components/ui/card").then((mod) => ({ default: mod.CardContent }))
);

export default function ChatPage() {
  return (
    <AuthGuard loadingVariant="chat">
      <ChatPageContent />
    </AuthGuard>
  );
}

function ChatPageContent() {  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isSubmitting,
  } = useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const t = useTranslations();
  const locale = useLocale();



  const handleFilesChange = (newFiles: FileList | undefined) => {
    setFiles(newFiles);
  };  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e, {
      experimental_attachments: files,
      locale: locale // Pass the current language to include hidden language instruction
    });
    setFiles(undefined);
  };

  // Quick prompts removed as requested

  // Track footer visibility to adjust UI accordingly
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Effect to listen for footer visibility changes
  useEffect(() => {
    const handleFooterVisibilityChange = () => {
      // Check if the footer is visible by its transform state
      const footer = document.querySelector('nav');
      if (footer) {
        // Initial state
        const isVisible = !footer.classList.contains('translate-y-full');
        setIsFooterVisible(isVisible);
        
        // Using MutationObserver to watch for class changes on the footer element
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const isVisible = !footer.classList.contains('translate-y-full');
              setIsTransitioning(true);
              
              // Set a timeout matching the transition duration
              setTimeout(() => {
                setIsFooterVisible(isVisible);
                setIsTransitioning(false);
              }, 300); // Match this with the transition duration
            }
          });
        });
        
        observer.observe(footer, { attributes: true });
        return () => observer.disconnect();
      }
    };
    
    handleFooterVisibilityChange();
    
    // Set up a global event listener for the toggle button
    const handleToggleEvent = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('button[aria-label*="Navigation"]')) {
        setIsTransitioning(true);
        // Toggle with a slight delay to match the animation
        setTimeout(() => {
          setIsFooterVisible(prev => !prev);
          setIsTransitioning(false);
        }, 300); // Match with transition duration
      }
    };
    
    document.addEventListener('click', handleToggleEvent);
    return () => document.removeEventListener('click', handleToggleEvent);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-4">
            <div className={`max-w-4xl py-8 mx-auto space-y-6 ${isFooterVisible ? 'pb-[240px]' : 'pb-24'} transition-all duration-500`}>
              {messages.length === 0 && (
                <AnimatedSection delay={0.2}>
                  <div className="py-12 text-center">
                    <AnimatedSection delay={0.4}>
                      <div className="flex items-center justify-center w-20 h-20 p-2 mx-auto mb-6 rounded-2xl overflow-hidden">
                        <Image 
                          src="/imgs/1750783385632jx2g3bb3.webp"
                          alt="AI Student Space Logo"
                          width={80}
                          height={80}
                          className="object-contain" 
                          priority
                        />
                      </div>
                    </AnimatedSection>{" "}
                    <AnimatedSection delay={0.6}>
                      <h2 className="mb-3 text-3xl font-bold text-foreground">
                        {t("chat.welcome")}
                      </h2>
                    </AnimatedSection>
                    <AnimatedSection delay={0.8}>
                      <p className="max-w-md mx-auto mb-8 text-lg text-muted-foreground">
                        {t("chat.description")}
                      </p>
                    </AnimatedSection>
                    {/* Quick Action Buttons removed as requested */}
                  </div>
                </AnimatedSection>
              )}{" "}
              {messages.map((message) => {
                const isRTL = locale === "ar";
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex gap-4 items-start ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                        <Image 
                          src="/imgs/1750783385632jx2g3bb3.webp"
                          alt="AI Student Space Logo"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}{" "}
                    <div className="max-w-[80%] bg-card border border-border rounded-2xl p-4">
                      <div
                        className={`whitespace-pre-wrap text-base leading-relaxed ${
                          isRTL ? "text-right" : "text-left"
                        } text-card-foreground`}
                      >
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                      {/* Render attachments */}{" "}
                      {message.experimental_attachments && (
                        <div className="mt-4 space-y-3">
                          <div className="flex flex-wrap gap-3 justify-start">
                            {message.experimental_attachments.map(
                              (attachment, index) => (
                                <Card
                                  key={`${attachment.name}-${attachment.url}-${index}`}
                                  className="p-3 transition-colors bg-card border-border hover:bg-accent rounded-xl w-fit"
                                >
                                  <CardContent className="flex items-center gap-2 flex-row">
                                    {attachment.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        src={attachment.url ?? ""}
                                        alt={attachment.name ?? "Attachment"}
                                        width={50}
                                        height={50}
                                        className="rounded-md"
                                      />
                                    ) : (
                                      <FileText className="w-5 h-5 text-muted-foreground" />
                                    )}
                                    <span className="text-sm text-card-foreground">
                                      {attachment.name ?? "Attachment"}
                                    </span>
                                  </CardContent>
                                </Card>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>{" "}
                    {isUser && (
                      <Avatar className="flex-shrink-0 w-10 h-10 mt-1 border-2 border-emerald-400/20">
                        <AvatarFallback className="bg-secondary">
                          <User className="w-5 h-5 text-secondary-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })}{" "}
              {isLoading && (
                <div className="flex gap-4 items-start">
                  <div className="rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image 
                      src="/imgs/1750783385632jx2g3bb3.webp"
                      alt="AI Student Space Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4 border bg-card border-border rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>{" "}
        {/* Input Area */}
        <div 
          className={`fixed ${isFooterVisible ? 'bottom-[76px]' : 'bottom-4'} left-0 right-0 z-10 border-t border-border bg-background/95 backdrop-blur-md transition-all duration-500 ease-in-out ${isTransitioning ? 'pointer-events-none' : ''}`}
        >
          <div className="max-w-4xl p-6 mx-auto">
            <FileInputArea
              input={input}
              onInputChange={handleInputChange}
              onSubmit={onSubmit}
              files={files}
              onFilesChange={handleFilesChange}
              isLoading={isLoading || isSubmitting}
              placeholder={t("chat.placeholder")}
              acceptedFileTypes="image/*,application/pdf,.pdf,.doc,.docx,.txt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
