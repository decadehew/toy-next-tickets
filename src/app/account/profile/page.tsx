import { Heading } from '@/components/heading'
import { AccountTabs } from '@/features/account/components/account-tabs'

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="Profile"
        description="Manage your account profile"
        tabs={<AccountTabs />}
      />
    </div>
  )
}

export default ProfilePage
