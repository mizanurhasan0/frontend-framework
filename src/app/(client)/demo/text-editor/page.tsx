"use client";

import { useState } from "react";
import { TextEditor } from "@/components/forms/text-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TextEditorDemo() {
    const [content, setContent] = useState("");
    const [minimalContent, setMinimalContent] = useState("");
    const [readOnlyContent, setReadOnlyContent] = useState("<h1>React Quill Editor</h1><p>This is a <strong>read-only</strong> content with <em>formatting</em> that cannot be edited.</p><ul><li>Feature 1</li><li>Feature 2</li></ul>");

    // Minimal toolbar configuration
    const minimalModules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
    };

    const minimalFormats = ["bold", "italic", "underline", "list", "bullet", "link"];

    // Full toolbar configuration
    const fullModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">React Quill Text Editor</h1>
                <p className="text-muted-foreground mt-2">
                    Rich text editor powered by React Quill with full formatting capabilities
                </p>
            </div>

            {/* Features Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>React Quill Features</CardTitle>
                    <CardDescription>
                        Professional rich text editing with comprehensive formatting options
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold">Text Formatting</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Bold, Italic, Underline, Strike</li>
                                <li>• Headers (H1-H6)</li>
                                <li>• Font size and family</li>
                                <li>• Text color and background</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold">Layout & Structure</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Ordered and unordered lists</li>
                                <li>• Indentation controls</li>
                                <li>• Text alignment</li>
                                <li>• Blockquotes and code blocks</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold">Media & Links</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Insert images and videos</li>
                                <li>• Add hyperlinks</li>
                                <li>• Copy-paste support</li>
                                <li>• Undo/Redo functionality</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Full Featured Editor */}
            <Card>
                <CardHeader>
                    <CardTitle>Full Featured Editor</CardTitle>
                    <CardDescription>
                        Complete toolbar with all formatting options
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Start writing with full formatting options..."
                        height={300}
                        modules={fullModules}
                    />
                    <div className="mt-4">
                        <Badge variant="outline">Character count: {content.replace(/<[^>]*>/g, '').length}</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Minimal Editor */}
            <Card>
                <CardHeader>
                    <CardTitle>Minimal Editor</CardTitle>
                    <CardDescription>
                        Simplified toolbar with basic formatting options
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TextEditor
                        value={minimalContent}
                        onChange={setMinimalContent}
                        placeholder="Basic formatting only..."
                        height={200}
                        modules={minimalModules}
                        formats={minimalFormats}
                    />
                </CardContent>
            </Card>

            {/* Read-Only Editor */}
            <Card>
                <CardHeader>
                    <CardTitle>Read-Only Editor</CardTitle>
                    <CardDescription>
                        Display formatted content without editing capabilities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TextEditor
                        value={readOnlyContent}
                        onChange={() => { }}
                        readOnly={true}
                        height={200}
                    />
                </CardContent>
            </Card>

            {/* Custom Height Editor */}
            <Card>
                <CardHeader>
                    <CardTitle>Custom Height Editor</CardTitle>
                    <CardDescription>
                        Editor with custom height and compact toolbar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TextEditor
                        value=""
                        onChange={() => { }}
                        placeholder="Compact editor with custom height..."
                        height={150}
                        modules={{
                            toolbar: [
                                ["bold", "italic"],
                                [{ list: "bullet" }],
                                ["link"],
                            ],
                        }}
                        formats={["bold", "italic", "list", "link"]}
                    />
                </CardContent>
            </Card>

            {/* Content Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Content Preview</CardTitle>
                    <CardDescription>
                        See the HTML output from the editors above
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">Full Featured Content:</h4>
                        <div className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-32">
                            <pre className="whitespace-pre-wrap">{content || "No content yet"}</pre>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Minimal Content:</h4>
                        <div className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-32">
                            <pre className="whitespace-pre-wrap">{minimalContent || "No content yet"}</pre>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Usage Examples */}
            <Card>
                <CardHeader>
                    <CardTitle>Usage Examples</CardTitle>
                    <CardDescription>
                        Different ways to use the React Quill text editor
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3">Basic Usage</h4>
                            <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                                {`const [content, setContent] = useState("");

<TextEditor
    value={content}
    onChange={setContent}
    placeholder="Start writing..."
/>`}
                            </pre>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Custom Configuration</h4>
                            <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                                {`const customModules = {
    toolbar: [
        ["bold", "italic"],
        [{ list: "bullet" }],
        ["link"]
    ]
};

<TextEditor
    value={content}
    onChange={setContent}
    modules={customModules}
    height={200}
    readOnly={false}
/>`}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* React Quill Benefits */}
            <Card>
                <CardHeader>
                    <CardTitle>Why React Quill?</CardTitle>
                    <CardDescription>
                        Benefits of using React Quill for rich text editing
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3 text-green-600">Advantages</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• Professional rich text editing</li>
                                <li>• Extensive formatting options</li>
                                <li>• Cross-browser compatibility</li>
                                <li>• Active community and support</li>
                                <li>• Customizable toolbar</li>
                                <li>• Built-in accessibility features</li>
                                <li>• Mobile-friendly interface</li>
                                <li>• Clean HTML output</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-blue-600">Features</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• Real-time collaboration ready</li>
                                <li>• Delta format for efficient updates</li>
                                <li>• Modular architecture</li>
                                <li>• Theme customization</li>
                                <li>• Keyboard shortcuts</li>
                                <li>• Paste handling</li>
                                <li>• Image and video embedding</li>
                                <li>• Formula and table support</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 