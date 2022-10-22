function Pair({ forex_pair, rate }) {
    let rate_name = forex_pair.split('/')[1]
    return (
        <div className="stat bg-black text-green-500 shadow-md w-fit rounded-md transform transition duration-500 hover:scale-110">
            <div className="stat-title font-bold">{forex_pair}</div>
            <div className="stat-value font-mono text-lg">{
                Intl.NumberFormat(
                    'en-US',
                    {
                        style: 'currency',
                        currency: rate_name,
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    }
                ).format(rate)
            }</div>
        </div>
    );
}

export default Pair;