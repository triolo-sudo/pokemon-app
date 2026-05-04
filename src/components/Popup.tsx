import { useEffect, useState } from "react"

type Props = {
    message: string
}

export default function Popup({ message }: Props) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (message) {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
            }, 1800)

            return () => clearTimeout(timer)
        }
    }, [message])

    if (!visible) return null

    return (
        <div
            className="
                fixed
                top-6
                left-1/2
                -translate-x-1/2
                z-50

                bg-white/10
                backdrop-blur-md
                border border-skyBlue/20

                text-skyText
                px-4 py-2
                rounded-xl

                shadow-lg

                animate-fade-in

                whitespace-nowrap
                max-w-xs
            "
        >
            {message}
        </div>
    )
}