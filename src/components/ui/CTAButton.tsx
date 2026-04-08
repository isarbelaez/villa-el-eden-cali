import { cn } from "@lib/utils";

const variants = {
    primary:
        "bg-gold text-forest! border border-gold hover:bg-transparent hover:text-gold!",

    outline:
        "bg-transparent text-white border border-white hover:bg-white hover:text-forest",

    "solid-forest":
        "bg-forest text-white border border-forest hover:bg-gold hover:text-forest hover:border-gold"
} as const;

type Variant = keyof typeof variants;

type Props = {
    text: string;
    href: string;
    variant?: Variant;
    className?: string;
};

export default function CTAButton({
    text,
    href,
    variant = "primary",
    className
}: Props) {
    return (
        <a
            href={href}
            className={cn(
                "inline-flex items-center justify-center px-8 py-3 rounded font-semibold tracking-wider uppercase no-underline w-full transition-colors! duration-300",
                variants[variant],
                className
            )}
        >
            {text}
        </a>
    );
}