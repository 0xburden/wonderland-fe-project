import { useWriteContract } from 'wagmi'
import { erc20Abi, parseUnits } from 'viem'
import { useAppSelector } from '../../redux/hooks'
import { type Address } from '../../../contstants'

export function useApproval(amount: number) {
  const targetAddress = useAppSelector((state) => state.targetAddress.value)
  const token = useAppSelector((state) => state.token.value)
  const tokenInfo = useAppSelector((state) => state.tokenInfo.value)

  const { writeContract, ...rest } = useWriteContract()

  return {
    ...rest,
    approve: () =>
      writeContract({
        address: token as Address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [targetAddress as Address, parseUnits(amount.toString(), tokenInfo?.decimals ?? 18)],
      }),
  }
}
