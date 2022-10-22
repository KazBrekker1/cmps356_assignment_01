import Pair from "./Pair";

function Pairs({ base_name, rates }) {
    return (
        <div className="flex flex-wrap justify-around stats gap-10 p-5">
            {
                Object.keys(rates).map((rate) => (
                    <Pair key={rate} forex_pair={`${base_name}/${rate}`} rate={rates[rate]} />
                ))
            }
        </div>
    );
}

export default Pairs;