from django.db import models


class ContactPageContent(models.Model):
    lang = models.CharField(max_length=10)
    title = models.CharField(max_length=100)
    description = models.TextField()
    breadcrumb_home = models.CharField(max_length=100)
    breadcrumb_contact = models.CharField(max_length=100)
    breadcrumb_label = models.CharField(max_length=100)
    form_title = models.CharField(max_length=255)
    name_label = models.CharField(max_length=100)
    email_label = models.CharField(max_length=100)
    phone_label = models.CharField(max_length=100)
    message_label = models.CharField(max_length=100)
    submit_label = models.CharField(max_length=100)
    sending_label = models.CharField(max_length=100)
    success_message = models.CharField(max_length=255)
    error_message = models.CharField(max_length=255)
    map_title = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Contact page contents"
        ordering = ["id"]

    def __str__(self):
        return f"Contact page ({self.lang})"


class ContactInfo(models.Model):
    lang = models.CharField(max_length=10)
    address_label = models.CharField(max_length=100)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.TextField(blank=True)
    email_label = models.CharField(max_length=100)
    email = models.EmailField()
    social_label = models.CharField(max_length=100)
    map_url = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Contact info"
        ordering = ["id"]

    def __str__(self):
        return f"Contact info ({self.lang})"


class ContactSocialLink(models.Model):
    contact = models.ForeignKey(ContactInfo, related_name="social_links", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    label = models.CharField(max_length=100)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label