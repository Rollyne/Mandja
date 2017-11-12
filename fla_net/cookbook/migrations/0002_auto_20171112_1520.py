# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-12 15:20
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='date_last_updated',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 12, 15, 20, 8, 318836, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='comment',
            name='date_published',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 12, 15, 20, 8, 318816, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.Comment'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='date_last_updated',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 12, 15, 20, 8, 317224, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='date_published',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 12, 15, 20, 8, 317200, tzinfo=utc)),
        ),
    ]
