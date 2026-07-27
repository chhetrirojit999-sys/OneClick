from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ('CUSTOMER', 'Customer'),
        ('PROVIDER', 'Provider'),
        ('ADMIN', 'Admin'),
    )

    username = None

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='CUSTOMER'
    )

    phone = models.CharField(
    max_length=15,
    unique=True,
    blank=True,
    null=True
)

    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email