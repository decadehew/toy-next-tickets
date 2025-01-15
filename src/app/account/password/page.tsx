import { Heading } from '@/components/heading'
import { AccountTabs } from '@/features/account/components/account-tabs'

const PasswordPage = () => {
  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="Password"
        description="Manage your account password"
        tabs={<AccountTabs />}
      />
    </div>
  )
}

export default PasswordPage
