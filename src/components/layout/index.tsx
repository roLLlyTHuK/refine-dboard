import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
import Header from "./header"

const Layuot = ({ children }: React.PropsWithChildren) => {
    return (
        <ThemedLayoutV2
            Header={Header}
            Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine Dashboard" />}>
            {children}
        </ThemedLayoutV2>
    )
}

export default Layuot