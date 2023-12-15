import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { TasksModule } from './app/tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: false,
      ssl: {
        rejectUnauthorized: true,
      },
    } as TypeOrmModuleOptions),
    TasksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
