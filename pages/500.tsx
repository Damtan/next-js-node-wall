function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred ale kutasek on server`
                : 'An error occurred on client fajny co?'}
        </p>
    )
}


export default Error
