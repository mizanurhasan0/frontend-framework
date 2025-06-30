import React from "react"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail } from "lucide-react";

export const TopBar = () => {
    return (
        <div className="bg-[#006400] text-white h-10 ">
            <div className="container mx-auto h-full flex justify-between items-center px-4">
                <div className="flex items-center gap-2">
                    <Phone />
                    <p>(+880) 1717-111111</p>
                    <Mail />
                    <p>info@example.com</p>
                </div>
                <div className="flex items-center gap-2">
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <Youtube className="text-red-500 w-7 h-7" />
                </div>
            </div>
        </div>
    )
}