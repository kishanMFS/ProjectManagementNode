interface User {
  user_id: string;
  email_id: string;
  password: string;
}

interface loginBody {
  emailId?: string;
  password?: string;
}
interface JwtPayload {
  id: string;
  emailId: string;
}

export type { User, loginBody, JwtPayload };
