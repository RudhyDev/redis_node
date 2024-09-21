import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule,
    MongooseModule.forRoot('mongodb://localhost/teste-caches'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        enableDebugMessages: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
