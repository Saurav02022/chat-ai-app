import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to home page - dashboard is now merged with home
  redirect('/');
}
