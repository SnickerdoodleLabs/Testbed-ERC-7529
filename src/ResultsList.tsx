import { verifedContract } from './objects';
import { ChainId } from '@snickerdoodlelabs/objects';

export default function ResultsList(props: { results: verifedContract[], chain: ChainId }) {
    return (
        <div className='results'>
            <ul id='2'>
                {
                    props.results.map((result) => <div key={result.address}>{result.address}: {result.verified ? "Verified" : "Not verified"} on chain {props.chain}.</div>)
                }
            </ul>
        </div>
    )
};