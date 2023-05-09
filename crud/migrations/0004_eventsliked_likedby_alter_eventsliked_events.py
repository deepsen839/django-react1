# Generated by Django 4.2.1 on 2023-05-09 12:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('crud', '0003_remove_eventsliked_likedby_eventsmodel_created_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventsliked',
            name='likedby',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_details', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='eventsliked',
            name='events',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='crud.eventsmodel'),
        ),
    ]