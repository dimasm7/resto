import styles from "./styles.module.css"
const FlashMessage = () => {
    return (
        <div className={"bg-green-400 inline-flex w-full items-center rounded-lg bg-success-100 px-3 py-2 text-base text-white " + styles.wrapper} role="alert">
            <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd" />
                </svg>
            </span>
            Data telah direset ulang
        </div>
    )
}
export default FlashMessage