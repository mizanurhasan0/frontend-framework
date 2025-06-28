"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface DescriptionEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    height?: number;
    maxLength?: number;
    showCharacterCount?: boolean;
    autoResize?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    spellCheck?: boolean;
    showToolbar?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

interface ToolbarButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title?: string;
}

const ToolbarButton = React.memo<ToolbarButtonProps>(({ icon, onClick, isActive, disabled, title }) => {
    return (
        <Button
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="h-8 w-8 p-0"
        >
            {icon}
        </Button>
    );
});

ToolbarButton.displayName = "ToolbarButton";

export const DescriptionEditor = React.memo<DescriptionEditorProps>(({
    value = "",
    onChange,
    placeholder = "Write your description...",
    className,
    height = 120,
    maxLength,
    showCharacterCount = false,
    autoResize = true,
    readOnly = false,
    autoFocus = false,
    spellCheck = true,
    showToolbar = true,
    onBlur,
    onFocus,
}) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [internalHeight, setInternalHeight] = React.useState(height);
    const [selectionStart, setSelectionStart] = React.useState(0);
    const [selectionEnd, setSelectionEnd] = React.useState(0);

    // Memoized change handler to prevent unnecessary re-renders
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        // Auto-resize functionality
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.min(Math.max(scrollHeight, height), 400);
            setInternalHeight(newHeight);
            textareaRef.current.style.height = `${newHeight}px`;
        }

        onChange?.(newValue);
    }, [onChange, autoResize, height]);

    // Memoized selection handler
    const handleSelectionChange = React.useCallback(() => {
        if (textareaRef.current) {
            setSelectionStart(textareaRef.current.selectionStart);
            setSelectionEnd(textareaRef.current.selectionEnd);
        }
    }, []);

    // Memoized blur handler
    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(e);
    }, [onBlur]);

    // Memoized focus handler
    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
        onFocus?.(e);
    }, [onFocus]);

    // Get selected text
    const getSelectedText = React.useCallback(() => {
        if (textareaRef.current) {
            return value.slice(selectionStart, selectionEnd);
        }
        return "";
    }, [value, selectionStart, selectionEnd]);

    // Replace selected text
    const replaceSelectedText = React.useCallback((replacement: string) => {
        if (textareaRef.current && onChange) {
            const newValue = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);
            onChange(newValue);

            // Set cursor position after replacement
            setTimeout(() => {
                if (textareaRef.current) {
                    const newPosition = selectionStart + replacement.length;
                    textareaRef.current.setSelectionRange(newPosition, newPosition);
                    textareaRef.current.focus();
                }
            }, 0);
        }
    }, [value, selectionStart, selectionEnd, onChange]);

    // Wrap text with formatting
    const wrapText = React.useCallback((before: string, after: string = before) => {
        const selectedText = getSelectedText();
        if (selectedText) {
            replaceSelectedText(`${before}${selectedText}${after}`);
        } else {
            // If no text selected, insert the markers and place cursor between them
            const newValue = value.slice(0, selectionStart) + before + after + value.slice(selectionStart);
            onChange?.(newValue);
            setTimeout(() => {
                if (textareaRef.current) {
                    const newPosition = selectionStart + before.length;
                    textareaRef.current.setSelectionRange(newPosition, newPosition);
                    textareaRef.current.focus();
                }
            }, 0);
        }
    }, [getSelectedText, replaceSelectedText, value, selectionStart, onChange]);

    // Format text handlers
    const formatBold = React.useCallback(() => {
        wrapText("**");
    }, [wrapText]);

    const formatItalic = React.useCallback(() => {
        wrapText("*");
    }, [wrapText]);

    const formatParagraph = React.useCallback(() => {
        const selectedText = getSelectedText();
        if (selectedText) {
            // Wrap in paragraph tags
            replaceSelectedText(`<p>${selectedText}</p>`);
        } else {
            // Insert paragraph template
            const newValue = value.slice(0, selectionStart) + "<p></p>" + value.slice(selectionStart);
            onChange?.(newValue);
            setTimeout(() => {
                if (textareaRef.current) {
                    const newPosition = selectionStart + 3; // Position cursor inside <p></p>
                    textareaRef.current.setSelectionRange(newPosition, newPosition);
                    textareaRef.current.focus();
                }
            }, 0);
        }
    }, [getSelectedText, replaceSelectedText, value, selectionStart, onChange]);

    // Reset height when value changes externally
    React.useEffect(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.min(Math.max(scrollHeight, height), 400);
            setInternalHeight(newHeight);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [value, autoResize, height]);

    const characterCount = value.length;
    const isOverLimit = maxLength && characterCount > maxLength;

    return (
        <div className={cn("relative", className)}>
            {showToolbar && !readOnly && (
                <div className="flex items-center gap-1 p-2 border-b bg-muted/30 rounded-t-md">
                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<Bold className="h-4 w-4" />}
                            onClick={formatBold}
                            title="Bold (Ctrl+B)"
                        />
                        <ToolbarButton
                            icon={<Italic className="h-4 w-4" />}
                            onClick={formatItalic}
                            title="Italic (Ctrl+I)"
                        />
                        <ToolbarButton
                            icon={<Type className="h-4 w-4" />}
                            onClick={formatParagraph}
                            title="Paragraph"
                        />
                    </div>

                    <div className="ml-auto flex items-center gap-1">
                        {showCharacterCount && (
                            <span className={cn(
                                "text-xs px-2 py-1 rounded",
                                isOverLimit ? "text-destructive" : "text-muted-foreground"
                            )}>
                                {characterCount}
                                {maxLength && `/${maxLength}`}
                            </span>
                        )}
                    </div>
                </div>
            )}

            <Textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                onSelect={handleSelectionChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                readOnly={readOnly}
                autoFocus={autoFocus}
                spellCheck={spellCheck}
                maxLength={maxLength}
                className={cn(
                    "resize-none transition-all duration-200 ease-out",
                    "focus:ring-2 focus:ring-ring focus:ring-offset-0",
                    "placeholder:text-muted-foreground/60",
                    "text-sm leading-relaxed",
                    isOverLimit && "border-destructive focus:ring-destructive",
                    autoResize && "overflow-hidden",
                    showToolbar && !readOnly && "rounded-t-none"
                )}
                style={{
                    height: autoResize ? `${internalHeight}px` : `${height}px`,
                    minHeight: `${height}px`,
                    maxHeight: autoResize ? '400px' : undefined,
                }}
            />

            {showCharacterCount && !showToolbar && (
                <div className={cn(
                    "absolute bottom-2 right-2 text-xs",
                    "bg-background/80 backdrop-blur-sm px-2 py-1 rounded",
                    "border border-border/50"
                )}>
                    <span className={cn(
                        isOverLimit ? "text-destructive" : "text-muted-foreground"
                    )}>
                        {characterCount}
                        {maxLength && `/${maxLength}`}
                    </span>
                </div>
            )}
        </div>
    );
});

DescriptionEditor.displayName = "DescriptionEditor"; 