# Pricing & Billing

## Pricing

Changelog

- 2025/08/12: Add price for text to model & image to model & texture model for v3.0
- 2025/01/23: Add price for quad param for generation endpoints.
- 2024/11/11: Add more prices for various endpoints.
- 2024/08/16: Checking wallet balance is added.
- 2024/04/24: Rigging, stylization, and export services are now subject to fees.
- 2024/04/08: Introduction of initial pricing plan.

### Pricing Details

| Model Version Turbo V1.0 (Fast Model), V3.0 (Latest Model), V2.5 and V2.0 |
|  | Without Texture 1 | Standard Texture 2 |
| Text to 3D7 | 10 | 20 |
| Image to 3D7 | 20 | 30 |
| Multiview to 3D 47 | 20 | 30 |

| Model Version V1.4 (Fatest Model) |
| Text | 20 |
| Image | 30 |
| Refine | 30 |

| Image | 5 |

This is added on top of the generation credits cost if selected

| Low Poly | 10 |
| Generate in parts | 20 |
| Quad Topology | 5 |
| Style | 5 |
| HD Texture3 | 10 |
| Detailed Geometry Quality | 20 |

| Standard Texture | 10 |
| HD Texture | 20 |
| Style Reference | 5 |

| Segmentation | 40 |
| Part Completion | 50 |

| Post Stylization | 20 |
| Format Conversion - Basic5 | 5 |
| Format Conversion - Advanced 6 | 10 |
| Retopology | 10 |
| Post Low-poly | 30 |

| Rig Check | Free |
| Rigging | 25 |
| Retarget | 10 per animation |

- The basic output includes only the base model, without texture, or PBR. Set texture=False and pbr=False to enable.
- For standard quality output, both the baked texture model and PBR model are included. This is the default setting.
- High definition quality output also includes both the baked texture model and PBR model, but at a higher resolution. Set texture_quality=detailed to enable.
- The model version of Multiview not support Turbo-v1.0-*.
- When converting only the base model, no other parameters are included in the output.
- The advanced export includes retopologize, control of face counts, and format conversion, providing enhanced flexibility and precision in model processing. This feature will be triggered by any other parameters except format.
- If quad or style param is set, it will cost 5 more credits. For example:

- Standard text based generation with style: 20 + 5 = 25 credits
- HD texture image based generation with style and quad: 40 + 5 + 5 = 50 credits

## FAQ

### How Do Credits Work?

Credits come in two categories: available and frozen.

- Available Credits are ready to use for generating new tasks.
- Frozen Credits are temporarily held when a new task is initiated and are deducted upon successful task completion. If a task fails, expires, or encounters an issue, credits are automatically refunded from frozen back to available after a certain period.

Additionally, initiating a new payment adds to your frozen credits, which transition to available upon payment completion.

### Do You Offer Different Payment Models?

Currently, we operate on a pay-as-you-go model where users purchase credits in advance and use them as needed. We’re continuously exploring new options to better meet the needs of all our users. If you have specific requirements or ideas, we’d love to hear from you.

### How Can I Check My Wallet Balance?

Currently, you can check your wallet balance by following the guidance at wallet.

### Do Credits Expire?

No, purchased credits are permanent and do not expire. Use them at your convenience without worry.

### Can I Request a Refund?

We do not offer refunds for purchased credits. To ensure you’re comfortable with your purchase, we recommend starting with the free credits to gauge your needs before making a purchase.

### Are There Any Discounts Available?

Yes! You can earn discounts and even free credits through our hackathons, workshops, or community giveaways. For the latest opportunities, join our Discord, follow us on social media, and stay engaged.

Special discounts are also available for teams, studios, and enterprises. For more details, please reach out to us at payment@tripo3d.ai.

### What Payment Methods Are Accepted?

We accept a variety of payment methods, including credit cards and debit cards. Depending on your location and the platform, options like Apple Pay, Google Pay, Alipay, and WeChat Pay may also be available. Enterprises seeking more flexible payment options are encouraged to contact us directly.

### How Is Payment and Personal Information Handled?

We use Stripe for our payment processing. This means your payment information is securely handled by Stripe and is not stored or accessed by our systems. Stripe is a PCI-compliant service provider, and we conduct regular reviews to ensure your information remains secure.

### How Can I Find My Receipt After Payment?

Receipts are sent to the email address provided during the Stripe checkout process (this may differ from your registered email if using a different address). If you haven’t received your receipt within 24 hours, please contact us.

### How Can I Request an Invoice After Payment?

Payments made after October 21, 2024 can be automatically invoiced and found from Recharge-History. For other payments, please contact us.

### What If I Encounter Payment or Billing Issues?

For any payment and billing-related inquiries or issues, feel free to contact us at payment@tripo3d.ai or support@tripo3d.ai. We’re here to assist you.