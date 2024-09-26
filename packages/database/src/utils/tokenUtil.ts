import jwt from "jsonwebtoken";

export class TokenUtil {
  private static secret: string = process.env.JWT_SECRET!;

  private static expiresIn = "3d";
  static generateToken(userId: string, roleId: string | null): string {
    return jwt.sign({ userId, roleId }, TokenUtil.secret, {
      expiresIn: TokenUtil.expiresIn,
    });
  }

  static verifyToken(token: string): { userId?: string; roleId?: string } {
    try {
      const decoded = jwt.verify(token, TokenUtil.secret) as {
        userId: string;
        roleId: string;
      };

      return decoded;
    } catch (error) {
      return {
        userId: undefined,
        roleId: undefined,
      };
    }
  }
}
