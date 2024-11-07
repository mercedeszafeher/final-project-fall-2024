import RegisterForm from './RegisterPage';

export default async function RegisterPage(props: any) {
  const { returnTo } = await props.searchParams;
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
