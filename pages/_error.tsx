import {PageError, RedirectError} from "../services/error/Errors";

export default function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    )
}

Error.getInitialProps = async function ({ res, err }) {
    const props = { statusCode: 500 }
    if (!res) return props

    if (err instanceof PageError) {
        props.statusCode = err.statusCode
        res.statusCode = err.statusCode
        if (err instanceof RedirectError) {
            res.writeHead(err.statusCode, { Location: encodeURI(err.url) })
            res.end()
        }
    } else {
        console.error(err)
    }
    return props
}
