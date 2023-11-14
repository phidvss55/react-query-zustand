import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

describe('jwtStrategy', () => {
  const prisma: PrismaService = new PrismaService();
  it('should be defined', () => {
    expect(new JwtStrategy(prisma)).toBeDefined();
  });
});
