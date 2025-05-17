import { useState, useEffect } from "react"
import { useThemeStore } from "../store/useThemeStore"
import { Sun, Moon } from "lucide-react"

function ThemeSelector(){

    const [darkmode, setDarkmode] = useState(
        JSON.parse(localStorage.getItem('darkmode'))
    );
    useEffect(()=> {
        localStorage.setItem('darkmode', JSON.stringify(darkmode));
    }, [darkmode]);

    const { theme, setTheme } = useThemeStore();

    return(
        <div>
            <label className="flex cursor-pointer gap-2 items-center">
                <Sun className="size-5"/>
                <input type="checkbox" className="toggle theme-controller"  checked={darkmode} onChange={()=>{ if(darkmode){setDarkmode(!darkmode); setTheme("emerald")} else{ setDarkmode(!darkmode); setTheme("dim")}}}/>
                <Moon className="size-5"/>
            </label>
        </div>
    )
}

export default ThemeSelector