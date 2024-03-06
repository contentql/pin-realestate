import ResetView from '@/views/ResetView'

interface searchParamsProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

function Reset({ searchParams }: searchParamsProps) {
  return <ResetView searchParams={searchParams} />
}

export default Reset
