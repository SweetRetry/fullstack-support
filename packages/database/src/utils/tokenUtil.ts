import jwt from "jsonwebtoken";

export class TokenUtil {
  private static secret: string = "sweetRetry_faq_jwt";

  private static expiresIn = "1h";
  static generateToken(userId: string, roleId: string | null): string {
    return jwt.sign({ userId, roleId }, TokenUtil.secret, {
      expiresIn: TokenUtil.expiresIn,
    });
  }

  static verifyToken(
    token: string
  ): { userId: string; roleId?: string } | null {
    try {
      const decoded = jwt.verify(token, TokenUtil.secret) as {
        userId: string;
        roleId: string;
      };

      return decoded;
    } catch (error) {
      return null;
    }
  }
}
