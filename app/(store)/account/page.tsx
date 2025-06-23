import { auth } from "@/auth";
import { ChangePasswordForm, UpdateProfileForm } from "@/components/form";
import { getUserById } from "@/lib/services/user.service";
import { redirect } from "next/navigation";

export const metadata = { title: "Account" };

const AccountPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  const user = await getUserById(userId);

  if (!user) throw new Error("userFetchError");

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
