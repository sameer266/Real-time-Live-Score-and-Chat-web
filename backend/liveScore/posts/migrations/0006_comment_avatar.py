# Generated by Django 5.1.3 on 2024-12-31 05:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_alter_comment_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='avatar',
            field=models.TextField(default='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'),
        ),
    ]