import { verifedContract } from './objects';
import { ChainId } from '@snickerdoodlelabs/objects';

export default function ResultsList(props: {results: verifedContract[], chain: ChainId}) {
    return (
        <ul id='2' className='results'>
            {
                props.results.map((result) => <div key={result.address}>{result.address}: {result.verified ? "Verified" : "Not verified"} on chain {props.chain}.</div>)
            }
        </ul>
    )
};