import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { ethers } from 'ethers';
import { staticUtils } from '@snickerdoodlelabs/erc7529';
import { ERC7529ContractProxy } from '@snickerdoodlelabs/contracts-sdk';
import { ChainId, DomainName, EVMContractAddress } from '@snickerdoodlelabs/objects';
import toast, { Toaster } from "react-hot-toast";
import "reflect-metadata";
import { verifedContract } from './objects'
import ResultsList from './ResultsList';
import './App.css';

export default function DomainInput() {

    const [label, setLabel] = useState<string>("Enter a Domain Name:");
    const [placeholder, setPlaceholder] = useState<string>("Enter a Domain Name:")
    const [value, setValue] = useState<string>("");
    const [fieldName, setFieldName] = useState<string>('field');
    const [chain, setChain] = useState<ChainId>(ChainId(43113));
    const [results, setResult] = useState<verifedContract[]>([]);

    function changeValue(event: ChangeEvent) {
        const target = event.target;
        if (target) setValue((target as HTMLButtonElement).value);
    }

    async function handleKeyPress(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            const target: EventTarget = event.target;
            if (target) {
                // grab the domain that was entered intot the text input field 
                const domainName: DomainName = DomainName((target as HTMLButtonElement).value);
                try {
                    if (window.ethereum != null) {
                        const currentChain = ChainId(
                            Number(
                                await window.ethereum.request(
                                    {
                                        "method": "eth_chainId",
                                        "params": []
                                    }
                                )
                            )
                        );
                        console.log("current chain", currentChain)
                        setChain(currentChain);
                        // first check if domain has TXT pointer to some contracts
                        const addresses = await staticUtils.getContractsFromDomain(domainName, currentChain);
                        console.log("addresses:", addresses);
                        // if so, verify each contract
                        if (addresses.isOk()) {
                            if (addresses.value.length > 0) {
                                let resultsBuf: verifedContract[] = [];
                                const provider = new ethers.providers.Web3Provider(window.ethereum);
                                await provider.getNetwork();
                                for (const address of addresses.value) {
                                    const myContract = new ERC7529ContractProxy(provider, EVMContractAddress(address));
                                    if (window.ethereum != null) {
                                        const isVerified = await staticUtils.verifyContractForDomain(myContract, domainName, currentChain);
                                        if (isVerified.isOk()) {
                                            resultsBuf.push({ address: address, verified: true })
                                        } else {
                                            resultsBuf.push({ address: address, verified: false })
                                        }
                                    }
                                }
                                console.log("resultBuf:", resultsBuf);
                                setLabel("Found Something! Try another domain:");
                                setResult(resultsBuf);
                            } else {
                                setLabel("Try a different domain:");
                                setResult([]);
                            }
                        }
                    } else {
                        toast.error('You will need Metamask installed for this app to verify contracts.')
                        setLabel("Please install a wallet & try again:");
                        setResult([]);
                    }
                } catch {
                    setLabel("Try a different domain:");
                } finally {
                    setValue("");
                }
            }
        }
    }

    return (
        <>
            <Toaster />
            <div className={fieldName}>
                <input
                    id='1'
                    type='text'
                    name='domainInput'
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => { setFieldName('field active'); setPlaceholder(''); }}
                    onBlur={() => { setFieldName('field'); setPlaceholder(value); }}
                    onChange={changeValue}
                    onKeyDown={handleKeyPress}
                />
                <label htmlFor='1'>
                    {label}
                </label>
            </div><br></br>
            <ResultsList results={results} chain={chain} />
        </>
    );
}