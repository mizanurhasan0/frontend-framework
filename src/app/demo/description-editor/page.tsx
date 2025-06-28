"use client";

import { useState, useCallback } from "react";
import { DescriptionEditor } from "@/components/forms/description-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DescriptionEditorDemo() {
    const [descriptions, setDescriptions] = useState({
        basic: "",
        withToolbar: "",
        withCount: "",
        limited: "",
        readOnly: "This is a **read-only** description with *formatting* that cannot be edited. It's useful for displaying content without allowing modifications.",
        autoResize: "",
        fixedHeight: "",
        noToolbar: "",
    });

    const [showCharacterCount, setShowCharacterCount] = useState(true);
    const [autoResize, setAutoResize] = useState(true);
    const [showToolbar, setShowToolbar] = useState(true);

    // Memoized update function for better performance
    const updateDescription = useCallback((key: string, value: string) => {
        setDescriptions(prev => ({ ...prev, [key]: value }));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Description Editor</h1>
                <p className="text-muted-foreground mt-2">
                    Lightweight, high-performance editor with formatting toolbar
                </p>
            </div>

            {/* Performance Features */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Features</CardTitle>
                    <CardDescription>
                        This editor is optimized for speed and minimal rendering
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="character-count"
                                checked={showCharacterCount}
                                onCheckedChange={setShowCharacterCount}
                            />
                            <Label htmlFor="character-count">Show Character Count</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="auto-resize"
                                checked={autoResize}
                                onCheckedChange={setAutoResize}
                            />
                            <Label htmlFor="auto-resize">Auto Resize</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="show-toolbar"
                                checked={showToolbar}
                                onCheckedChange={setShowToolbar}
                            />
                            <Label htmlFor="show-toolbar">Show Toolbar</Label>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">React.memo optimized</Badge>
                        <Badge variant="outline">useCallback handlers</Badge>
                        <Badge variant="outline">Minimal re-renders</Badge>
                        <Badge variant="outline">Lightweight DOM</Badge>
                        <Badge variant="outline">Formatting toolbar</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* With Toolbar */}
            <Card>
                <CardHeader>
                    <CardTitle>With Formatting Toolbar</CardTitle>
                    <CardDescription>
                        Basic formatting options: Bold (**text**), Italic (*text*), Paragraph (&lt;p&gt;text&lt;/p&gt;)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DescriptionEditor
                        value={descriptions.withToolbar}
                        onChange={(value) => updateDescription("withToolbar", value)}
                        placeholder="Select text and use toolbar buttons to format..."
                        autoResize={autoResize}
                        showCharacterCount={showCharacterCount}
                        showToolbar={showToolbar}
                    />
                    <div className="mt-3 text-xs text-muted-foreground">
                        <p><strong>Tip:</strong> Select text and click toolbar buttons, or click buttons to insert formatting markers.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Basic DescriptionEditor */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic DescriptionEditor</CardTitle>
                    <CardDescription>
                        Simple description input with auto-resize
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DescriptionEditor
                        value={descriptions.basic}
                        onChange={(value) => updateDescription("basic", value)}
                        placeholder="Write a basic description..."
                        autoResize={autoResize}
                        showCharacterCount={showCharacterCount}
                        showToolbar={false}
                    />
                </CardContent>
            </Card>

            {/* With Character Count */}
            <Card>
                <CardHeader>
                    <CardTitle>With Character Count</CardTitle>
                    <CardDescription>
                        Shows character count with visual feedback
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DescriptionEditor
                        value={descriptions.withCount}
                        onChange={(value) => updateDescription("withCount", value)}
                        placeholder="Type to see character count..."
                        showCharacterCount={true}
                        autoResize={autoResize}
                        showToolbar={showToolbar}
                    />
                </CardContent>
            </Card>

            {/* With Length Limit */}
            <Card>
                <CardHeader>
                    <CardTitle>With Length Limit</CardTitle>
                    <CardDescription>
                        Maximum 200 characters with visual feedback
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DescriptionEditor
                        value={descriptions.limited}
                        onChange={(value) => updateDescription("limited", value)}
                        placeholder="Maximum 200 characters..."
                        maxLength={200}
                        showCharacterCount={true}
                        autoResize={autoResize}
                        showToolbar={showToolbar}
                    />
                </CardContent>
            </Card>

            {/* Read-Only */}
            <Card>
                <CardHeader>
                    <CardTitle>Read-Only Mode</CardTitle>
                    <CardDescription>
                        Display content without editing capabilities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DescriptionEditor
                        value={descriptions.readOnly}
                        onChange={() => { }}
                        readOnly={true}
                        showCharacterCount={true}
                        showToolbar={false}
                    />
                </CardContent>
            </Card>

            {/* Auto-Resize vs Fixed Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Auto-Resize</CardTitle>
                        <CardDescription>
                            Automatically adjusts height based on content
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DescriptionEditor
                            value={descriptions.autoResize}
                            onChange={(value) => updateDescription("autoResize", value)}
                            placeholder="Type to see auto-resize in action..."
                            autoResize={true}
                            showCharacterCount={true}
                            showToolbar={showToolbar}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Fixed Height</CardTitle>
                        <CardDescription>
                            Fixed height with scroll when content overflows
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DescriptionEditor
                            value={descriptions.fixedHeight}
                            onChange={(value) => updateDescription("fixedHeight", value)}
                            placeholder="Fixed height with scroll..."
                            autoResize={false}
                            height={150}
                            showCharacterCount={true}
                            showToolbar={showToolbar}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Formatting Examples */}
            <Card>
                <CardHeader>
                    <CardTitle>Formatting Examples</CardTitle>
                    <CardDescription>
                        Examples of how to use the formatting toolbar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3">Markdown Formatting</h4>
                            <div className="space-y-2 text-sm">
                                <div><code>**Bold text**</code> → <strong>Bold text</strong></div>
                                <div><code>*Italic text*</code> → <em>Italic text</em></div>
                                <div><code>&lt;p&gt;Paragraph&lt;/p&gt;</code> → HTML paragraph</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Usage Tips</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• Select text and click toolbar buttons</li>
                                <li>• Click buttons without selection to insert markers</li>
                                <li>• Use keyboard shortcuts (Ctrl+B, Ctrl+I)</li>
                                <li>• Character count updates in real-time</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Performance Comparison */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Comparison</CardTitle>
                    <CardDescription>
                        Why this editor is faster than alternatives
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3 text-green-600">This Editor (Fast)</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• React.memo prevents unnecessary re-renders</li>
                                <li>• useCallback for stable function references</li>
                                <li>• Minimal DOM structure</li>
                                <li>• Lightweight formatting toolbar</li>
                                <li>• Optimized auto-resize algorithm</li>
                                <li>• Smart text selection handling</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-red-600">Heavy Editors (Slow)</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• Complex toolbar rendering</li>
                                <li>• Heavy markdown parsing</li>
                                <li>• Multiple state updates</li>
                                <li>• Large bundle size</li>
                                <li>• Complex formatting logic</li>
                                <li>• Unnecessary re-renders</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Content Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Content Preview</CardTitle>
                    <CardDescription>
                        See all the content from the editors above
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(descriptions).map(([key, content]) => (
                        <div key={key}>
                            <h4 className="font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</h4>
                            <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                                {content || "No content yet"}
                            </pre>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
} 