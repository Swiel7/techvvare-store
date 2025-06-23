import { ChangePasswordForm, UpdateProfileForm } from "@/components/form";
import { TUser } from "@/types";

export const metadata = { title: "Account" };

const AccountPage = () => {
  const user = {} as TUser;

  return (
    <section>
      <div className="wrapper">
        <div className="space-y-8 lg:space-y-10">
          <UpdateProfileForm user={user} />
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
