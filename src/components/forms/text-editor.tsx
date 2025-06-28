"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Code,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    Heading1,
    Heading2,
    Heading3,
} from "lucide-react";

interface TextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    height?: number;
    readOnly?: boolean;
    showToolbar?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
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

export function TextEditor({
    value = "",
    onChange,
    placeholder = "Start writing...",
    className,
    height = 300,
    readOnly = false,
    showToolbar = true,
    onBlur,
    onFocus,
}: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
            }),
            Underline,
        ],
        content: value,
        editable: !readOnly,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);
        },
        onBlur: () => {
            onBlur?.();
        },
        onFocus: () => {
            onFocus?.();
        },
    });

    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

    if (!editor) {
        return (
            <div className={cn("w-full", className)}>
                <div className="w-full h-32 bg-muted animate-pulse rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Loading editor...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("w-full border rounded-md", className)}>
            {showToolbar && !readOnly && (
                <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<Heading1 className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            isActive={editor.isActive("heading", { level: 1 })}
                            title="Heading 1"
                        />
                        <ToolbarButton
                            icon={<Heading2 className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            isActive={editor.isActive("heading", { level: 2 })}
                            title="Heading 2"
                        />
                        <ToolbarButton
                            icon={<Heading3 className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            isActive={editor.isActive("heading", { level: 3 })}
                            title="Heading 3"
                        />
                    </div>

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<Bold className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={editor.isActive("bold")}
                            title="Bold (Ctrl+B)"
                        />
                        <ToolbarButton
                            icon={<Italic className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive("italic")}
                            title="Italic (Ctrl+I)"
                        />
                        <ToolbarButton
                            icon={<UnderlineIcon className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            isActive={editor.isActive("underline")}
                            title="Underline (Ctrl+U)"
                        />
                        <ToolbarButton
                            icon={<Strikethrough className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={editor.isActive("strike")}
                            title="Strikethrough"
                        />
                    </div>

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<List className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive("bulletList")}
                            title="Bullet List"
                        />
                        <ToolbarButton
                            icon={<ListOrdered className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive("orderedList")}
                            title="Numbered List"
                        />
                        <ToolbarButton
                            icon={<Quote className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive("blockquote")}
                            title="Quote"
                        />
                        <ToolbarButton
                            icon={<Code className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            isActive={editor.isActive("codeBlock")}
                            title="Code Block"
                        />
                    </div>

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<AlignLeft className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().setTextAlign("left").run()}
                            isActive={editor.isActive({ textAlign: "left" })}
                            title="Align Left"
                        />
                        <ToolbarButton
                            icon={<AlignCenter className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().setTextAlign("center").run()}
                            isActive={editor.isActive({ textAlign: "center" })}
                            title="Align Center"
                        />
                        <ToolbarButton
                            icon={<AlignRight className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().setTextAlign("right").run()}
                            isActive={editor.isActive({ textAlign: "right" })}
                            title="Align Right"
                        />
                        <ToolbarButton
                            icon={<AlignJustify className="h-4 w-4" />}
                            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                            isActive={editor.isActive({ textAlign: "justify" })}
                            title="Justify"
                        />
                    </div>

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<LinkIcon className="h-4 w-4" />}
                            onClick={() => {
                                const url = window.prompt("Enter URL");
                                if (url) {
                                    editor.chain().focus().setLink({ href: url }).run();
                                }
                            }}
                            isActive={editor.isActive("link")}
                            title="Insert Link"
                        />
                    </div>
                </div>
            )}

            <div
                className="prose prose-sm max-w-none p-4 focus:outline-none"
                style={{ minHeight: `${height}px` }}
            >
                <EditorContent editor={editor} />
            </div>

            <style jsx global>{`
                .ProseMirror {
                    outline: none;
                    min-height: ${height - (showToolbar && !readOnly ? 120 : 60)}px;
                    font-size: 14px;
                    line-height: 1.6;
                }
                .ProseMirror p.is-editor-empty:first-child::before {
                    color: hsl(var(--muted-foreground));
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                }
                .ProseMirror h1 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin: 1em 0 0.5em 0;
                }
                .ProseMirror h2 {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin: 1em 0 0.5em 0;
                }
                .ProseMirror h3 {
                    font-size: 1.1em;
                    font-weight: bold;
                    margin: 1em 0 0.5em 0;
                }
                .ProseMirror ul,
                .ProseMirror ol {
                    padding-left: 1.5em;
                    margin: 0.5em 0;
                }
                .ProseMirror blockquote {
                    border-left: 3px solid hsl(var(--border));
                    margin: 1em 0;
                    padding-left: 1em;
                    font-style: italic;
                }
                .ProseMirror pre {
                    background: hsl(var(--muted));
                    border-radius: 4px;
                    padding: 1em;
                    margin: 1em 0;
                    overflow-x: auto;
                }
                .ProseMirror code {
                    background: hsl(var(--muted));
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-size: 0.9em;
                }
                .ProseMirror a {
                    color: hsl(var(--primary));
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
} 