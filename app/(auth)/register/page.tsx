import RegisterForm from './RegisterForm';

export default async function RegisterPage(props: any) {
  const { returnTo } = await props.searchParams;
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
