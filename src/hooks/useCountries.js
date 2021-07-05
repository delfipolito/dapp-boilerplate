import argentina from '../assets/argentina.svg'
import brazil from '../assets/brazil.svg'
import mexico from '../assets/mexico.svg'

const countries = [
  {
    id: 'Argentina',
    name: 'Argentina',
    flag: argentina,
    top: true,
    apy: '154%',
    tokenReward: '40.000 num/week',
    fees: '$230.040/week',
    totalLiquidity: '349.080.555 USD',
  },
  {
    id: 'Brazil',
    name: 'Brazil',
    flag: brazil,
    top: true,
    apy: '120%',
    tokenReward: '80.000 num/week',
    fees: '$200.100/week',
    totalLiquidity: '452.080.555 USD',
  },
  {
    id: 'Mexico',
    name: 'Mexico',
    top: true,
    flag: mexico,
    apy: '34%',
    tokenReward: '20.000 num/week',
    fees: '$30.040/week',
    totalLiquidity: '9.080.555 USD',
  },
]

export function useCountries() {
  return countries
}
